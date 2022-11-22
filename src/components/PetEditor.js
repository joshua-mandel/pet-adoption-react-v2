import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

function PetEditor({ auth, showError }) {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(true);
    axios(`${process.env.REACT_APP_API_URL}/api/pet/${petId}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPending(false);
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
        setPending(false);
        setError(err.message);
        showError(err.message);
      });
  }, [auth, showError, petId]);

  return (
    <div>
      <h1>Pet Editor</h1>
      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div className="text-danger mb-2">{error}</div>}
      {pet && (
        <form>
          <div>{petId}</div>
          <div>{pet.name}</div>
          <div>{pet.species}</div>
          <div>{pet.gender}</div>
          <div>{pet.age}</div>
        </form>
      )}
    </div>
  );
}

export default PetEditor;
