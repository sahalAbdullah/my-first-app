import { useQuery } from 'react-query';
import FormHandler from '../components/formHandler/FormHandler';

const FormFirstScreen = () => {
  const { isLoading, isError, data } = useQuery('repoData', async () => {
    const response = await fetch(
      'https://api.github.com/repos/tannerlinsley/react-query'
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
  // return <FormHandler />;
};

export default FormFirstScreen;
