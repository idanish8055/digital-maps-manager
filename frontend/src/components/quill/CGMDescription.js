import ReactQuill from 'react-quill';
import './quillsnow.css';

const CGMDescription = (props) => {
  const modules = {
    toolbar: props.toolbar
  };

  const formats = null;

  return (
    <>
      <ReactQuill
        value={props.richText !== null && props.richText !== undefined ? props.richText : (props.value !== null && props.value !== undefined ? props.value : "")}
        onChange={props.onChange}
        readOnly={false}
        modules={modules}
        formats={formats}
      />
    </>
  );
}

export default CGMDescription;