// function handleResize() {
//   console.log('resized');
//   $('#class').text('Resized!');
// }

let handleResize = () => {
  console.log('resized');
  $('#class').text('Resized!');
}

let object = {
  x: 'hello'
};
console.log(object.x);

window.addEventListener('resize', handleResize);




for (let i = 0; i < batteryEvents.length; i++) {} == batteryEvents.forEach()