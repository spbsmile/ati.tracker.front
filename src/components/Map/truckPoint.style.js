const K_WIDTH = 10;
const K_HEIGHT = 10;

const pointStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #e6ba4d',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  color: '#ffffff',
};

export {pointStyle};