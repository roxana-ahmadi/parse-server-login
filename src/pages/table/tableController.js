/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import Parse from 'parse';
import { Record } from 'immutable';
import { withState, withHandlers, pipe, withLifeCycle } from '../../js';

const ClauseQuery = Parse.Object.extend('ClauseQuery');

const onCreate = ({ setData }) => {
  const query = new Parse.Query('ClauseQuery');
  query.find().then(result => {
    setData(d => d.set('personsList', result));
  });
};

const addPerson = ({ data, setData }) => () => {
  const obj = new Parse.Object('ClauseQuery');
  obj
    .save({
      name: data.personName,
    })
    .then(() =>
      setData(d =>
        d.merge({
          personName: undefined,
          personsList: d.personsList.concat(obj),
        }),
      ),
    );
};

const setPersonName = ({ setData }) => personName => {
  setData(d => d.set('personName', personName));
};

const deletePerson = ({ setData, data }) => index => {
  const selectedPerson = data.personsList[index];
  const query = new Parse.Query('ClauseQuery');
  query.get(selectedPerson.id).then(response => {
    response.destroy().then(() =>
      setData(d =>
        d.set(
          'personsList',
          d.personsList.filter((value, i) => i !== index),
        ),
      ),
    );
  });
};

const makeMainQuery = ({ setData }) => oprandData => {
  let mainQuery = new Parse.Query(ClauseQuery);
  if (oprandData.op === 'and') {
    oprandData.childs.map(item => {
      if (!item.childs) {
        mainQuery = Parse.Query.and(mainQuery, item);
      } else {
        mainQuery = Parse.Query.and(mainQuery, item.mainQuery);
      }
    });
  } else {
    oprandData.childs.map((item, key) => {
      if (!item.childs) {
        if (key === 0) {
          mainQuery = item;
        }
        mainQuery = Parse.Query.or(mainQuery, item);
      } else {
        if (key === 0) {
          mainQuery = item.mainQuery;
        }
        mainQuery = Parse.Query.or(mainQuery, item.mainQuery);
      }
    });
  }
  setData(d => d.set('tmpdata', oprandData));
  mainQuery.find().then(result => {
    setData(d => d.set('personsList', result));
  });
};

const editPerson = ({ data, setData }) => index => {
  const selectedPerson = data.personsList[index];
  setData(d =>
    d.merge({
      personName: selectedPerson.name,
      selectedPersonId: selectedPerson.id,
      selectedPersonIndex: index,
      editing: !data.editing,
    }),
  );
};

const confirmEdit = ({ setData, data }) => () => {
  const query = new Parse.Query('ClauseQuery');
  query.get(data.selectedPersonId).then(response => {
    response
      .save({
        name: data.personName,
      })
      .then(updatedPerson => {
        const tempList = [...data.personsList];
        tempList.splice(data.selectedPersonIndex, 1, updatedPerson);
        setData(d =>
          d.merge({
            personsList: tempList,
            editing: !data.editing,
            personName: undefined,
          }),
        );
      });
  });
};

const showDatafilter = ({ setData }) => () => {
  setData(d => d.set('dataFilterVisible', true));
};

const closeDatafilter = ({ setData }) => () => {
  setData(d => d.merge({ dataFilterVisible: false }));
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

const handleUpload = ({ data, setData }) => () => {
  setData(d => d.set('uploading', true));
  const formData = new FormData();
  const { fileList } = data;

  fileList.forEach(file => {
    return formData.append('files[]', file);
  });
  fileList.map(item => {
    console.log(item, 'after upload');
    const file = new Parse.File(`${item.name}`, item, `${item.type}`);
    file.save().then(res => console.log(res, 'res'));
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
    personName: undefined,
    personsList: [],
    selectedPersonId: undefined,
    selectedPersonIndex: undefined,
    editing: false,
    tmpdata: null,
    dataFilterVisible: false,
    fileList: [],
    uploading: false,
  });

const tableController = pipe(
  withState(() => init(), 'data', 'setData'),
  withHandlers({
    addPerson,
    setPersonName,
    deletePerson,
    editPerson,
    confirmEdit,
    makeMainQuery,
    showDatafilter,
    closeDatafilter,
    onRemove,
    beforeUpload,
    handleUpload,
    beforeCrop,
  }),
  withLifeCycle({
    onCreate,
  }),
);

export default tableController;
