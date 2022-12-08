import { Link } from 'react-router-dom';

function PetListItem({ item }) {
  return (
    <div className="card border-dark mb-2">
      <div className="card-body">
        <h2 className="card-title">
          <Link className='pet-list-title' to={`/pet/${item._id}`}>{item.name}</Link>
        </h2>

        <div className="card-text">
          <span className="me-2 badge bg-primary">{item.species}</span>
          <span className="me-2 badge bg-primary">
            {item.gender === 'M' ? 'Male' : item.gender === 'F' ? 'Female' : item.gender}
          </span>
          <span className="me-2 badge bg-primary">{item.age} years old</span>
        </div>
      </div>
    </div>
  );
}

export default PetListItem;
