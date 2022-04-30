import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import BasicLayout from '../../layouts/BasicLayout';
import { getCameraApi } from '../../api/camera';
import ListCameras from '../../components/ListCameras/ListCameras';

const Platform = () => {
	const [camera, setCamera] = useState(null);
	const { query } = useRouter();

	useEffect(() => {
		(async () => {
			const response = await getCameraApi(5);
			if (size(response) > 0) setCamera(response);
			else setCamera([]);
			console.log(camera);
		})();
	}, []);
	return (
		<BasicLayout className='home'>
			{!camera && <h2> Cargando Juegos </h2>}
      {camera && size(camera) === 0 && (
        <div>
          <h4>No hay camarás disponibles</h4>
        </div>
      )}
      {size(camera) > 0 && <ListCameras cameras={camera} /> }
		</BasicLayout>
	);
};

export default Platform;
