import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
  getDay,
  setYear,
} from 'date-fns';

function Calender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showYearPopup, setShowYearPopup] = useState(false);

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getDaysInMonth = (date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = eachDayOfInterval({ start, end });
    
    const firstDayOfMonth = getDay(start);
    
    const paddingDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      paddingDays.unshift(addDays(start, -i - 1));
    }
    
    const lastDayOfMonth = getDay(end);
    const remainingDays = 6 - lastDayOfMonth;
    const endPaddingDays = [];
    for (let i = 1; i <= remainingDays; i++) {
      endPaddingDays.push(addDays(end, i));
    }
    
    return [...paddingDays, ...days, ...endPaddingDays];
  };

  const isToday = (date) => {
    return isSameDay(date, new Date());
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const handleYearSelect = (year) => {
    setCurrentDate(setYear(currentDate, year));
    setShowYearPopup(false);
  };

  return (
    <div className="relative bg-[#1E2329] rounded-lg px-4 py-2">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={previousMonth}
          className="text-gray-400 hover:text-white p-2"
        >
          ←
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">
            {format(currentDate, 'MMMM')}
          </span>
          <button 
            onClick={() => setShowYearPopup(true)}
            className="text-xl font-semibold hover:text-blue-400 transition-colors"
          >
            {format(currentDate, 'yyyy')}
          </button>
        </div>
        <button 
          onClick={nextMonth}
          className="text-gray-400 hover:text-white p-2"
        >
          →
        </button>
      </div>

      {showYearPopup && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-[#2A303C] rounded-lg shadow-xl p-4 z-10 w-48">
          <div className="max-h-48 overflow-y-auto">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`
                  w-full text-left px-4 py-2 rounded
                  ${year === currentYear ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}
                `}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div 
            key={day} 
            className="text-center text-gray-400 font-medium py-2"
          >
            {day}
          </div>
        ))}
        
        {getDaysInMonth(currentDate).map((date) => {
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isSelected = isSameDay(date, selectedDate);
          const todayClass = isToday(date) ? 'border-2 border-blue-500' : '';
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`
                h-12 flex items-center justify-center rounded-lg
                ${isCurrentMonth ? 'text-white' : 'text-gray-500'}
                ${isSelected ? 'bg-blue-600' : 'hover:bg-gray-700'}
                ${todayClass}
                transition-colors
              `}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center text-gray-400">
        Selected: {format(selectedDate, 'MMMM d, yyyy')}
      </div>
    </div>
  );
}

export default Calender;