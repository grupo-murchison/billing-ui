import { PickersCalendarHeader } from '@mui/x-date-pickers';
import { SlideDirection } from '@mui/x-date-pickers/DateCalendar/PickersSlideTransition';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

/**
 * Proptotipo en desarrollo para usar en la prop renderCustomHeader={} de react-datepicker
 * Ver: https://reactdatepicker.com/#example-custom-header
 */
const DatepickerRenderHeader = ({ date, decreaseMonth, increaseMonth }: ReactDatePickerCustomHeaderProps) => {
  return (
    <PickersCalendarHeader
      currentMonth={date}
      views={['year', 'month', 'day']}
      onMonthChange={function (date: unknown, slideDirection: SlideDirection): void {
        console.log(date);
        if (slideDirection === 'left') {
          increaseMonth();
        } else if (slideDirection === 'right') {
          decreaseMonth();
        }
      }}
      view={'day'}
      reduceAnimations={false}
      minDate={new Date('Mon Jan 01 1900 00:00:00 GMT-0416')}
      maxDate={new Date('Thu Dec 31 2099 00:00:00 GMT-0300')}
      timezone={'default'}
    />
  );
};

export default DatepickerRenderHeader;
