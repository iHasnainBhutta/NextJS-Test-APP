import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PersonPage from '../components/PersonPage';
import { fetchPersonDetails, Person } from '../api/api';
import styles from "../index.module.css"

interface PersonProps {
  person: Person | null;
  skin_color: Person | null;
  gender: Person | null;
  url: Person | null;
}

const PersonComponent: React.FC<PersonProps> = ({ person, skin_color, gender, url }) => {
  const router = useRouter();

  const [personData, setPersonData] = useState<Person | null>(person);
  const { id } = router.query;



  // Use useEffect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const fetchedPerson = await fetchPersonDetails(`https://swapi.dev/api/people/${id}`);
          setPersonData(fetchedPerson);
        }
      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.main}>


      <div className="container mx-auto my-10 ">
        <div className="bg-[#ffff] px-6 lg:px-16 py-10 rounded-3xl">

          <PersonPage person={personData} />
        </div>
      </div>

    </div>
  )

};

export default PersonComponent;
