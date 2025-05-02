import ReactSelect from 'react-select';
import { useField } from 'formik';

export const Select = ({ name, label, options }: Props) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <ReactSelect
        options={options}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        menuPortalTarget={document.body}
        value={options.find((opt) => opt.value === field.value)}
        onChange={(option) => {
          helpers.setValue(option?.value);
        }}
        className={meta.error && meta.touched ? 'input-error' : ''}
        classNames={{
          control: () => 'form-select-control',
        }}
      />
      {meta.error && meta.touched && <p className="form-input__error">{meta.error}</p>}
    </div>
  );
};

type SelectOption = {
  value: string;
  label: string;
};

interface Props {
  label: string;
  name: string;
  options: SelectOption[];
}
