import React, { useState, useEffect } from 'react';
import { fetchPeople, PeopleResponse } from '../api/api';
import dynamic from 'next/dynamic';

const PeopleList = dynamic(() => import('../components/PeopleList'), { ssr: false });
const LottieAnimation = dynamic(() => import('../components/LottieAnimation'), { ssr: false });

const People: React.FC = () => {
    const [people, setPeople] = useState<PeopleResponse>({ results: [] });
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPeople(page);
                setPeople((prevPeople: any) => ({
                    results: [...prevPeople.results, ...data.results],
                }));
            } catch (error) {
                console.error('Error fetching people:', error);
            } finally {
                setLoading(false); // Set loading back to false whether data fetching is successful or not
            }
        };

        fetchData();
    }, [page]);

    const animationData = require('../../public/loading.json');

    return (
        <div className="container mx-auto text-center">

            <div className="container mx-auto py-20">
                <p className="text-base lg:text-xl font-medium text-gray-500 text-center">
                    MEET THE TEAM
                </p>
                <p className=" text-2xl lg:text-5xl font-semibold text-gray-500 text-center mt-3">
                    Star Wars Characters
                </p>
            </div>
            <React.Suspense fallback={<div>Loading...</div>}>
                {loading &&
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                        <LottieAnimation animationData={animationData} />
                    </div>
                }
                <PeopleList people={people.results} />
            </React.Suspense>


            <div className='flex justify-center items-center gap-6 py-6'>
                <button className='text-white uppercase bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg' onClick={() => setPage(page + 1)}>Load More</button>
            </div>

        </div>
    );
};

export default People;
