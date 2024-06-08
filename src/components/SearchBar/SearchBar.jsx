import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import css from '../SearchBar/SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const notify = () =>
  toast('Please, write your query!!!', {
    icon: '',
    style: {
      borderRadius: '10px',
      background: '#DC143C',
      color: '#fff',
    },
  });

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          if (values.query === '') {
            notify();
          } else {
            onSearch(values.query);
            actions.resetForm();
          }
        }}
      >
        <Form className={css.form}>
          <Field
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
          <Toaster position="top-right" reverseOrder={false} />
        </Form>
      </Formik>
    </header>
  );
}
