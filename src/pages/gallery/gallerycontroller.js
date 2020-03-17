import Parse from 'parse';
import { Record } from 'immutable';
import { withState, withHandlers, pipe } from '../../js';

const beforeUpload = ({ setData, data }) => file => {
  console.log(file, 'before upload');
  setData(d => d.set('fileList', data.fileList.concat(file)));
  return false;
};

const beforeCrop = ({ setData, data }) => file => {
  const tmpfile = new Parse.File('fileBeforeCrop', file, String(file.type));
  tmpfile.save().then(res => console.log('crop', res));
  setData(d => d.set('tmpobj', data.tmpobj.concat(file)));
  return true;
};

const onRemove = ({ data, setData }) => file => {
  const index = data.fileList.indexOf(file);
  setData(d =>
    d.set(
      'fileList',
      data.fileList.filter((value, i) => i !== index),
    ),
  );
};

const handleUpload = ({ data, setData }) => () => {
  setData(d => d.set('uploading', true));
  const formData = new FormData();
  const { fileList } = data;

  fileList.forEach(file => {
    return formData.append('files[]', file);
  });
  fileList.map(item => {
    const file = new Parse.File(`${item.name}`, item, `${item.type}`);
    return file.save().then(res => console.log(res, 'res'));
  });
  setData(d =>
    d.merge({
      fileList: [],
      uploading: false,
    }),
  );
};

const init = () =>
  Record({
    fileList: [],
    uploading: false,
  });

const galleryController = pipe(
  withState(() => init(), 'data', 'setData'),
  withHandlers({
    beforeUpload,
    handleUpload,
    beforeCrop,
    onRemove,
  }),
);

export default galleryController;
