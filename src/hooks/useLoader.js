import { useSelector } from 'react-redux';

const useLoader = () => {
  const { loading } = useSelector((state) => state.auth);
  return {
    loading,
  };
};

export default useLoader;
