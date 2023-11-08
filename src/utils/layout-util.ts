/** 一行一列布局对象 */
const colLayout1 = {
  cols: { md: 24, xl: 24, xxl: 24 }
};
/** 一行两列布局对象 */
const colLayout2 = {
  cols: { md: 24, xl: 12, xxl: 12 }, //一行两列时占一列时使用
  cols2: { md: 24, xl: 24, xxl: 24 } //一行两列时占两列时使用
};
/** 一行三列布局对象 */
const colLayout3 = {
  cols: { md: 12, xl: 8, xxl: 8 }, //一行三列时占一列时使用
  cols2: { md: 24, xl: 16, xxl: 16 }, //一行三列时占两列时使用
  cols3: { md: 24, xl: 24, xxl: 24 } //一行三列时占三列时使用
};
/** 一行四列布局对象 */
const colLayout4 = {
  cols: { md: 12, xl: 6, xxl: 6 }, //一行四列时占一列时使用
  cols2: { md: 16, xl: 12, xxl: 12 }, //一行四列时占两列时使用
  cols3: { md: 24, xl: 18, xxl: 18 }, //一行四列时占三列时使用
  cols4: { md: 24, xl: 24, xxl: 24 } //一行四列时占四列时使用
};

/**
 * 根据布局列数控制弹窗modal的宽高
 * （单列： 580*420  适用于1~6项内容时、
 *   两列：960*500   适用于6~12项内容时、
 *   三列：1280*600） 适用于12项以上
 * @param layout 列数
 * @param cutHeight 弹窗modal的body的高度比整个弹窗modal少的高度
 * @param bodyOverflowY 弹窗modal的body的overflow-y属性
 */
const modalWidthAndHeightBylayout = function (
  layout = 1,
  cutHeight = 55,
  bodyOverflowY = 'auto',
  backgroundColor = '#fff'
) {
  let modalStyleWidth = null;
  let modalStyleHeight = null;
  let bodyStyleWidth = null;
  let bodyStyleHeight = null;
  let bodyStylePadding = null;
  let standardModalWidth = null;
  let standardModalHeight = null;
  const docWidth = document.body.clientWidth;
  const docHeight = document.body.clientHeight;
  if (layout == 1) {
    if (docWidth < 580 || docHeight < 420) {
      modalStyleWidth = docWidth + 'px';
      modalStyleHeight = docHeight + 'px';
      bodyStyleWidth = docWidth + 'px';
      bodyStyleHeight = docHeight - cutHeight + 'px';
    } else {
      modalStyleWidth = 580 + 'px';
      modalStyleHeight = 420 + 'px';
      bodyStyleWidth = 580 + 'px';
      bodyStyleHeight = 420 - cutHeight + 'px';
    }
    standardModalWidth = 580 + 'px';
    standardModalHeight = 420 + 'px';
    bodyStylePadding = '20px 60px 20px 20px';
  } else if (layout == 2) {
    if (docWidth < 960 || docHeight < 500) {
      modalStyleWidth = docWidth + 'px';
      modalStyleHeight = docHeight + 'px';
      bodyStyleWidth = docWidth + 'px';
      bodyStyleHeight = docHeight - cutHeight + 'px';
    } else {
      modalStyleWidth = 960 + 'px';
      modalStyleHeight = 500 + 'px';
      bodyStyleWidth = 960 + 'px';
      bodyStyleHeight = 500 - cutHeight + 'px';
    }
    standardModalWidth = 960 + 'px';
    standardModalHeight = 500 + 'px';
    bodyStylePadding = '20px 60px 20px 20px';
  } else if (layout == 3) {
    if (docWidth < 1280 || docHeight < 600) {
      modalStyleWidth = docWidth + 'px';
      modalStyleHeight = docHeight + 'px';
      bodyStyleWidth = docWidth + 'px';
      bodyStyleHeight = docHeight - cutHeight + 'px';
    } else {
      modalStyleWidth = 1280 + 'px';
      modalStyleHeight = 600 + 'px';
      bodyStyleWidth = 1280 + 'px';
      bodyStyleHeight = 600 - cutHeight + 'px';
    }
    standardModalWidth = 1280 + 'px';
    standardModalHeight = 600 + 'px';
    bodyStylePadding = '20px 80px 20px 20px';
  } else if (layout == 4) {
    if (docWidth < 1280 || docHeight < 600) {
      modalStyleWidth = docWidth + 'px';
      modalStyleHeight = docHeight + 'px';
      bodyStyleWidth = docWidth + 'px';
      bodyStyleHeight = docHeight - cutHeight + 'px';
    } else {
      modalStyleWidth = 1280 + 'px';
      modalStyleHeight = 600 + 'px';
      bodyStyleWidth = 1280 + 'px';
      bodyStyleHeight = 600 - cutHeight + 'px';
    }
    standardModalWidth = 1280 + 'px';
    standardModalHeight = 600 + 'px';
    bodyStylePadding = '20px 80px 20px 20px';
  }
  return {
    modalStyle: {
      // 弹窗宽高控制
      width: modalStyleWidth,
      height: modalStyleHeight
    },
    bodyStyle: {
      // 弹窗body宽高控制
      width: bodyStyleWidth,
      height: bodyStyleHeight,
      padding: bodyStylePadding,
      overflowY: bodyOverflowY,
      backgroundColor
    },
    standardModalStyle: {
      width: parseInt(standardModalWidth),
      height: parseInt(standardModalHeight)
    }
  };
};

export { colLayout1, colLayout2, colLayout3, colLayout4, modalWidthAndHeightBylayout };
