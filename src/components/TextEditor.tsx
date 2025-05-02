import { useField, useFormikContext } from 'formik';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export const TextEditor = ({ label, name }: Props) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <ReactQuill theme="snow" value={field.value} onChange={(value) => setFieldValue(name, value)} />
      {meta.error && meta.touched && <p className="form-input__error">{meta.error}</p>}
    </div>
  );
};

interface Props {
  label: string;
  name: string;
}
