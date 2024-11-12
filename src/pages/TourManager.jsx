// import React, { useState } from 'react';
// import AddTour from '../admin_pages/AddTour';// Điều chỉnh đường dẫn import đúng
// import TourCard from '../shared/TourCard';
// const TourManager = () => {
//   const [tours, setTours] = useState([]);

//   const addTour = (newTour) => {
//     setTours([...tours, newTour]);
//   };

//   return (
//     <div>
//       <AddTour onAddTour={addTour} />
//       <div>
//         <h2>Danh sách Tour</h2>
//         {tours.map((tour, index) => (
//           <TourCard key={index} tour={tour} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TourManager;