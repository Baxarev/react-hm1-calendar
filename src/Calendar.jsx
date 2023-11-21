const Calendar = ({ date }) => {
  
  const arrWeek = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  const arrMonths = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
  const arrMonthsNominativeCase = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

  

  const calendarGenerator = () => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
    const offsetDays = (firstDayOfWeek - 1 + 7) % 7;
  
    let daysArray = Array.from({ length: lastDay }, (_, index) => new Date(date.getFullYear(), date.getMonth(), index + 1));
  
    for (let i = offsetDays - 1; i >= 0; i--) {
      const day = new Date(date.getFullYear(), date.getMonth(), 0 - i);
      daysArray = [day, ...daysArray];
    }
  
    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        const day = new Date(date.getFullYear(), date.getMonth() + 1, i);
        daysArray = [...daysArray, day];
      }
    }
  
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      const week = daysArray.slice(i, i + 7);
      weeks.push(week);
    }
  
    return (
      <>
        {weeks.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((day, index) => (
              <td
                key={index}
                className={getClassNames(day, today)}
              >
                {day.getDate()}
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };
  
  const getClassNames = (day, today) => {
    if (day.getMonth() !== date.getMonth()) {
      return 'ui-datepicker-other-month';
    }
    const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear();
    return isToday ? 'ui-datepicker-today' : '';
  };


  return (
  <div className="ui-datepicker">
    <div className="ui-datepicker-material-header">
      <div className="ui-datepicker-material-day">{arrWeek[date.getDay()]}</div>
      <div className="ui-datepicker-material-date">
        <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
        <div className="ui-datepicker-material-month">{arrMonths[date.getMonth()]}</div>
        <div className="ui-datepicker-material-year">{date.getFullYear()}</div>
      </div>
    </div>
    <div className="ui-datepicker-header">
      <div className="ui-datepicker-title">
        <span className="ui-datepicker-month">{arrMonthsNominativeCase[date.getMonth()]}</span>&nbsp;
        <span className="ui-datepicker-year">{date.getFullYear()}</span>
      </div>
    </div>
    <table className="ui-datepicker-calendar">
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
        <col className="ui-datepicker-week-end" />
        <col className="ui-datepicker-week-end" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" title="Понедельник">
            Пн
          </th>
          <th scope="col" title="Вторник">
            Вт
          </th>
          <th scope="col" title="Среда">
            Ср
          </th>
          <th scope="col" title="Четверг">
            Чт
          </th>
          <th scope="col" title="Пятница">
            Пт
          </th>
          <th scope="col" title="Суббота">
            Сб
          </th>
          <th scope="col" title="Воскресенье">
            Вс
          </th>
        </tr>
      </thead>
      <tbody>
        {calendarGenerator()}
      </tbody>
    </table>
  </div>
  );
};


export default Calendar;