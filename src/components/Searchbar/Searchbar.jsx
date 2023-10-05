import { Formik } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';
import { object, string } from 'yup';
import { SearchForm, Button, Input, Wraper } from './Searchbar.styled';

let schema = object({
  searchString: string().required(),
});

export function Searchbar({ onSearch }) {
  const handleSubmit = (values, actions) => {
    onSearch(values.searchString.trim());
  };

  return (
    <Formik initialValues={{ searchString: '' }} onSubmit={handleSubmit} validationSchema={schema}>
      <SearchForm>
        <Wraper>
          <Button type="submit">
            <AiOutlineSearch />
          </Button>
          <Input type="text" name="searchString" placeholder="Search images and photos" />
        </Wraper>
      </SearchForm>
    </Formik>
  );
}
