import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';

function ShiftCard({ shift, selected, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{ backgroundColor: selected ? 'primary.main' : 'white' }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" textAlign="center">
            {shift.facility_name}
          </Typography>
          <Typography textAlign="center">
            {moment(shift.shift_date).format('YYYY-MM-DD')}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {moment(`2022-12-12 ${shift.start_time}`).format('h:mm A')}-
            {moment(`2022-12-12 ${shift.end_time}`).format('h:mm A')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ShiftCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  shift: PropTypes.shape({
    shift_id: PropTypes.number,
    facility_name: PropTypes.string,
    shift_date: PropTypes.string,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
  }).isRequired,
};

export default ShiftCard;
