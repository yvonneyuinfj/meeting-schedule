// 文件后缀集合
export function fileTypeAll() {
  return {
    res: ['res'], // 平台授权文件类型
    text: ['txt', 'js', 'jsp', 'java', 'css', 'sql', 'ini', 'conf'],
    code: ['xml', 'html', 'htm'],
    word: ['doc', 'docx', 'wps'],
    excel: ['xls', 'xlsx', 'et'],
    ppt: ['ppt', 'pptx', 'dps'],
    pdf: ['pdf'],
    zip: [
      'zip',
      'rar',
      'tar',
      'gz',
      'cab',
      'uue',
      'arj',
      'bz2',
      'lzh',
      'jar',
      'ace',
      'iso',
      '7z',
      'z'
    ],
    image: ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'tif', 'psd', 'pic', 'svg'],
    video: ['rm', 'avi', 'mp4', 'mpg', 'mov', 'swf'],
    audio: ['wav', 'mp3', 'aif', 'au', 'ram', 'wma', 'mmf', 'amr', 'aac', 'flac']
  };
}
//浏览器可选类型
export function fileAcceptTypeAll() {
  return {
    code: ['text/xml, application/xml', 'text/html', 'text/html'],
    word: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-works'
    ],
    excel: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ],
    ppt: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ],
    pdf: ['application/pdf'],
    image: [
      'image/bmp',
      'image/gif',
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/tiff',
      'image/tiff',
      'image/psd',
      'image/pic',
      'image/svg',
      'image/webp'
    ]
  };
}

//动态创建正则表达式，验证文件后缀
export function createRegExp(fileType) {
  if (fileType && fileType.length > 0) {
    let reg = fileType.join('|');
    let regexp = new RegExp('(' + reg + ')$');
    return regexp;
  }
  return null;
}
//获取文件后缀
export function getFileExtension(fileName) {
  if (fileName) {
    let patternFileExtension = /\.([0-9a-z]+)(?:[?#]|$)/i;
    return fileName.match(patternFileExtension);
  }
  return '';
}
