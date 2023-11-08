import { download } from '@/utils/download-util'; // 引入下载方法
import type { downloadParam } from '@/utils/download-util';
import { createEditor } from '@wangeditor/editor'; // 引入富文本依赖
import { uuid } from '@/utils/common-util';
import { message } from 'ant-design-vue';
import lodash from 'lodash';
import { uploadImage } from '@/api/avic/system/CommonApi';
export const useRichText = (editorRef, formId, tableName) => {
  const toolbarConfig = {
      excludeKeys: ['fullScreen', 'group-video', 'insertImage'] // 去掉全屏、视频、网络图片菜单
    },
    editorConfig = ref({
      placeholder: '请输入内容...',
      MENU_CONF: {
        // 配置自定义上传图片
        uploadImage: {
          customUpload: uploadImg
        }
      }
    });

  /** 富文本onCreated事件 */
  const onCreated = editor => {
    editorRef.value = Object.seal(editor); // 记录 editor 实例，重要，一定要用 Object.seal() ，否则会报错
  };

  /** 自定义图片上传 */
  function uploadImg(file, insertFn) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('guid', uuid(32));
    formData.append('addTime', new Date().getTime().toString());
    formData.append('formId', formId);
    formData.append('tableName', tableName);
    formData.append('allowEncry', 'false');
    uploadImage(formData)
      .then(res => {
        if (res.success) {
          // 转为base64插入
          const oFileReader = new FileReader();
          oFileReader.onloadend = function (e) {
            const base64 = e.target.result;
            insertFn(base64, file.name, res.data);
          };
          oFileReader.readAsDataURL(file);
        } else {
          message.warning(`"${file.name}" 图片上传失败`);
        }
      })
      .catch(() => {
        message.warning(`"${file.name}" 图片上传失败`);
      });
  }
  /** 富文本提交前图片处理：将src属性的base64编码改为图片上传后的id */
  const convertImageSrc = data => {
    data?.map(item => {
      if (item.type == 'image') {
        if (item.href) {
          item.src = item.href;
        }
      }
      if (item.children) {
        convertImageSrc(item.children);
      }
    });
  };
  /** 回显表单时处理富文本方法 */
  async function dealRichText(demoRichtext) {
    const editor = createEditor({ html: demoRichtext });
    const editorJson = lodash.cloneDeep(editor.children);
    const promiseList = [];
    getImageSrc(editorJson, promiseList);
    await Promise.all(promiseList);
    const newEditor = createEditor({ content: editorJson });
    const newEditorHtml = newEditor.getHtml();
    editorRef.value.setHtml(newEditorHtml);
  }
  /** 富文本回显时图片处理：根据图片上传后的id下载文件流转为base64编码赋给图片src属性 */
  const getImageSrc = (data, pro) => {
    const pros = pro;
    data.map(item => {
      if (item.type == 'image') {
        if (item.src.indexOf('http') != 0 && item.src.indexOf('https') != 0) {
          pros.push(
            new Promise<void>(function (resolve) {
              const downloadDto = {
                url: `/appsys/common/uploader/download/v1/${item.src}`,
                data: null,
                method: 'get',
                listenerProgress: false,
                fileName: '',
                isdownload: false
              } as downloadParam;
              download(downloadDto)
                .then((res: Blob) => {
                  // 转为base64赋给src属性
                  const oFileReader = new FileReader();
                  oFileReader.onloadend = function (e) {
                    const base64 = e.target.result;
                    item.src = base64;
                    resolve();
                  };
                  oFileReader.readAsDataURL(res);
                })
                .catch(() => {
                  resolve();
                });
            })
          );
        }
      }
      if (item.children) {
        getImageSrc(item.children, pros);
      }
    });
  };

  return {
    toolbarConfig,
    editorConfig,
    onCreated,
    dealRichText,
    convertImageSrc
  };
};
