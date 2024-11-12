import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './XemLichTrinh.css';

const XemLichTrinh = ({ onClose, maTour }) => {
  const [schedule, setSchedule] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        if (maTour) {
          const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/sc/LichTrinh/sc/${maTour}`);
          setSchedule(response.data);
        } else {
          console.error('maTour is undefined');
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    const fetchActivities = async () => {
      try {
        if (schedule && schedule.maLichTrinh) {
          const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/MoTaLichTrinh/mt/${schedule.maLichTrinh}`);
          setActivities(response.data); 
        } else {
          console.error('schedule or maLichTrinh is undefined');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchScheduleData();
    if (schedule) {
      fetchActivities();
    }
  }, [maTour, schedule]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="schedule-form">
      <div className="modal-header">
        <h2>Lịch trình tour - {schedule?.tenLichTrinh || 'Đang tải...'}</h2>
        <span className="close" onClick={onClose}>
          &times;
        </span>
      </div>
      <div className="modal-body">
        <div className="tabs">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`tab ${activity.ngay === selectedDay ? 'active' : ''}`}
              onClick={() => handleDayClick(activity.ngay)}
            >
              {activity.ngay}
            </div>
          ))}
        </div>
        {selectedDay && (
          <div className="tab-content">
            {activities.find((activity) => activity.ngay === selectedDay)?.moTaHoatDong}
          </div>
        )}
      </div>
    </div>
  );
};

export default XemLichTrinh;

