const files = require.context('.', true, /\.png$|\.gif$|\.jpg$/);
const imgs = { png: {}, gif: {}, jpg: {} };
files.keys().forEach(key => {
  const pathArr = key.split('/').filter(str => {
    return !(str.startsWith('.') || str.endsWith('png') || str.endsWith('gif') || str.endsWith('jpg'));
  });

  if (pathArr[0] && !imgs[pathArr[0]]) {
    imgs[pathArr[0]] = { png: {}, gif: {}, jpg: {} };
  }
  if (pathArr[1] && !imgs[pathArr[0]][pathArr[1]]) {
    imgs[pathArr[0]][pathArr[1]] = { png: {}, gif: {}, jpg: {} };
  }
});
files.keys().forEach(key => {
  const pathArr = key.split('/');
  const paths = pathArr.filter(str => {
    return !(str.startsWith('.') || str.endsWith('png') || str.endsWith('gif') || str.endsWith('jpg'));
  });
  try {
    parseImg(paths, pathArr.pop(), key);
  } catch (error) {
    console.error(error);
  }
});

function parseImg (directory, picture, key) {
  const obj = getObj(directory);
  if (obj) {
    if (key.indexOf('png') > -1) {
      picture = picture.replace('.png', '').toLowerCase();
      obj.png[picture] = require(`${key}`);
    } else if (key.indexOf('gif') > -1) {
      picture = picture.replace('.gif', '').toLowerCase();
      obj.gif[picture] = require(`${key}`);
    } else if (key.indexOf('jpg') > -1) {
      picture = picture.replace('.jpg', '').toLowerCase();
      obj.jpg[picture] = require(`${key}`);
    }
  }

}

function getObj (directory) {
  if (directory.length === 0) {
    return imgs;
  } else if (directory.length === 1) {
    return imgs[directory[0]];
  } else if (directory.length === 2) {
    return imgs[directory[0]][directory[1]];
  }
}
export default imgs;
