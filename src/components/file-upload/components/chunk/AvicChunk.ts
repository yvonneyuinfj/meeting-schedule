import { createRequest, sendFormRequest } from './request';

export default class ChunkUploadHandler {
  /**
   * Constructor
   *
   * @param {File} file
   * @param {Object} options
   */
  constructor(file, options) {
    this.file = file;
    this.options = options;
  }

  /**
   * Gets the max retries from options
   */
  get maxRetries() {
    return parseInt(this.options.maxRetries);
  }

  /**
   * Gets the max number of active chunks being uploaded at once from options
   */
  get maxActiveChunks() {
    return parseInt(this.options.maxActive);
  }

  /**
   * Gets the file type
   */
  get fileType() {
    return this.file.type;
  }

  /**
   * Gets the file size
   */
  get fileSize() {
    return this.file.size;
  }

  /**
   * Gets the file name
   */
  get fileName() {
    return this.file.name;
  }

  /**
   * Gets action (url) to upload the file
   */
  get action() {
    return this.options.action || null;
  }

  /**
   * Gets the body to be merged when sending the request in start phase
   */
  get startBody() {
    return this.options.startBody || {};
  }

  /**
   * Gets the body to be merged when sending the request in upload phase
   */
  get uploadBody() {
    return this.options.uploadBody || {};
  }

  /**
   * Gets the body to be merged when sending the request in finish phase
   */
  get finishBody() {
    return this.options.finishBody || {};
  }

  /**
   * Gets the headers of the requests from options
   */
  get headers() {
    return this.options.headers || {};
  }

  /**
   * Whether it's ready to upload files or not
   */
  get readyToUpload() {
    return !!this.chunks;
  }

  /**
   * Gets the progress of the chunk upload
   * - Gets all the completed chunks
   * - Gets the progress of all the chunks that are being uploaded
   */
  get progress() {
    const completedProgress = (this.chunksUploaded.length / this.chunks.length) * 100;
    // const uploadingProgress = this.chunksUploading.reduce((progress, chunk) => {
    //   return progress + (chunk.progress | 0) / this.chunks.length;
    // }, 0);
    return Math.min(completedProgress, 100);
  }

  /**
   * Gets all the chunks that are pending to be uploaded
   */
  get chunksToUpload() {
    return this.chunks.filter(chunk => {
      return !chunk.active && !chunk.uploaded;
    });
  }

  /**
   * Whether there are chunks to upload or not
   */
  get hasChunksToUpload() {
    return this.chunksToUpload.length > 0;
  }

  /**
   * Gets all the chunks that are uploading
   */
  get chunksUploading() {
    return this.chunks.filter(chunk => {
      return !!chunk.xhr && !!chunk.active;
    });
  }

  /**
   * Gets all the chunks that have finished uploading
   */
  get chunksUploaded() {
    return this.chunks.filter(chunk => {
      return chunk.active == true;
    });
  }

  /**
   * Creates all the chunks in the initial state
   */
  createChunks() {
    this.chunks = [];

    let start = 0;
    let end = this.chunkSize;
    while (start < this.fileSize) {
      this.chunks.push({
        blob: this.file.file.slice(start, end),
        startOffset: start,
        active: false,
        retries: this.maxRetries
      });
      start = end;
      end = start + this.chunkSize;
    }
  }

  /**
   * Updates the progress of the file with the handler's progress
   */
  updateFileProgress(uploadFailed = false) {
    this.file.progress = this.progress;
    this.file.uploadFailed = uploadFailed;
  }

  /**
   * Paues the upload process
   * - Stops all active requests
   * - Sets the file not active
   */
  pause() {
    this.file.active = false;
    this.stopChunks();
  }

  /**
   * Stops all the current chunks
   */
  stopChunks() {
    this.chunksUploading.forEach(chunk => {
      chunk.xhr.abort();
      chunk.active = false;
    });
  }

  /**
   * Resumes the file upload
   * - Sets the file active
   * - Starts the following chunks
   */
  resume() {
    this.file.active = true;
    this.startChunking();
  }

  /**
   * Starts the file upload
   *
   * @returns Promise
   * - resolve  The file was uploaded
   * - reject   The file upload failed
   */
  upload() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    this.start();

    return this.promise;
  }

  /**
   * Start phase
   * Sends a request to the backend to initialise the chunks
   */
  start() {
    //
    const chunk = createRequest({
      method: 'POST',
      headers: Object.assign(this.headers),
      url: this.action
    });
    sendFormRequest(
      chunk,
      Object.assign(this.startBody, this.file.data, {
        phase: 'start',
        mime_type: this.fileType,
        size: this.fileSize,
        fileName: encodeURIComponent(this.fileName)
      })
    )
      .then(res => {
        if (res.success) {
          if (res.data.end_offset > 0) {
            this.sessionId = res.data.session_id;
            this.chunkSize = res.data.end_offset;
            this.createChunks();
            setTimeout(() => {
              this.startChunking();
            }, 500);
          }
        } else {
          this.file.response = res;
          return this.reject('server');
        }
      })
      .catch(res => {
        this.file.response = res;
        this.reject('server');
      });
  }

  /**
   * Starts to upload chunks
   */
  startChunking() {
    //for (let i = 0; i < this.maxActiveChunks; i++) {
    this.uploadNextChunk();
    //}
  }

  /**
   * Uploads the next chunk
   * - Won't do anything if the process is paused
   * - Will start finish phase if there are no more chunks to upload
   */
  uploadNextChunk() {
    if (this.file.active) {
      if (this.hasChunksToUpload) {
        return this.uploadChunk(this.chunksToUpload[0]);
      } else {
        return this.finish();
      }

      // if (this.chunksUploading.length === 0) {
      //   return this.finish()
      // }
    }
  }

  /**
   * Uploads a chunk
   * - Sends the chunk to the backend
   * - Sets the chunk as uploaded if everything went well
   * - Decreases the number of retries if anything went wrong
   * - Fails if there are no more retries
   *
   * @param {Object} chunk
   */
  uploadChunk(chunk) {
    chunk.progress = 0;
    chunk.active = true;
    chunk.xhr = createRequest({
      method: 'POST',
      headers: Object.assign(this.headers),
      url: this.action
    });

    chunk.xhr.upload.addEventListener(
      'progress',
      function (evt) {
        if (evt.lengthComputable) {
          const progress = Math.round((evt.loaded / evt.total) * 100);
          if (progress >= chunk.progress) {
            chunk.progress = progress;
          }
        }
      },
      false
    );
    sendFormRequest(
      chunk.xhr,
      Object.assign(this.uploadBody, this.file.data, {
        phase: 'upload',
        session_id: this.sessionId,
        start_offset: chunk.startOffset,
        file: chunk.blob,
        size: this.fileSize,
        fileName: encodeURIComponent(this.fileName)
      })
    )
      .then(res => {
        // chunk.active = true
        if (res.success) {
          chunk.uploaded = true;
        } else {
          if (chunk.retries-- <= 0) {
            this.stopChunks();
            this.updateFileProgress(true);
            return this.reject('upload');
          }
        }
        this.updateFileProgress();
        this.uploadNextChunk();
      })
      .catch(() => {
        // chunk.active = true
        if (chunk.retries-- <= 0) {
          this.stopChunks();
          this.updateFileProgress(true);
          return this.reject('upload');
        }
        this.uploadNextChunk();
      });
  }

  /**
   * Finish phase
   * Sends a request to the backend to finish the process
   */
  finish() {
    // this.updateFileProgress();
    const chunk = createRequest({
      method: 'POST',
      headers: Object.assign(this.headers),
      url: this.action
    });
    sendFormRequest(
      chunk,
      Object.assign(this.finishBody, this.file.data, {
        phase: 'finish',
        session_id: this.sessionId,
        size: this.fileSize,
        fileName: encodeURIComponent(this.fileName)
      })
    )
      .then(res => {
        if (!res.success) {
          this.file.response = res;
          this.updateFileProgress(true);
          return this.reject('server');
        }
        try {
          this.file.response = res;
          this.resolve(res);
          this.updateFileProgress();
        } catch (e) {
          console.log(e, '-------error---');
        }
      })
      .catch(res => {
        this.file.response = res;
        this.reject('server');
        this.updateFileProgress(true);
      });
  }
}
