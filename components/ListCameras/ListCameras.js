import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { map } from "lodash";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

const ListCameras = ({ cameras }) => {
  console.log(cameras);
  return (
    <div className="cameras">
      <h2>Cámaras</h2>
      <hr />
      <div className="list-cameras">
        {map(cameras, (camera) => (
          <Camera camera={camera} />
        ))}
      </div>
    </div>
  );
};

function Camera({ camera }) {
  console.log(camera);
  return (
    <div className="camera-card">
      <div className="img-camera-card">
        <img src={camera.poster.url} alt="" />
      </div>
      <div className="content-camera-card">
        <h3>{camera.title}</h3>
        <p>{camera.summary}</p>
      </div>
      <div className="actions-card">
        <Button size="small" variant="contained">
          Agregar <LocalGroceryStoreIcon />
        </Button>
        <Button size="small">Ver más</Button>
{/* 
        <Button size="small">
          <FavoriteBorderIcon />
        </Button> */}
      </div>
    </div>
   
  );
}

export default ListCameras;
