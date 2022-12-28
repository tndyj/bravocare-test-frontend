import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ShiftCard from './ShiftCard';
import api from './api';

import './App.css';

function App() {
  const [shifts, setShifts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [comparing, setComparing] = useState(false);
  const [overlap, setOverlap] = useState(null);
  const handleToggle = (shift) => {
    if (selected.includes(shift.shift_id)) {
      setSelected(selected.filter((s) => s !== shift.shift_id));
    } else if (selected.length < 2) {
      setSelected([...selected, shift.shift_id]);
    }
  };
  const compareShifts = async () => {
    setOverlap(null);
    if (selected.length === 2) {
      setComparing(true);
      const resp = await api.compareShifts(selected);
      if (resp.ok) {
        setOverlap(resp.data);
      }
      setComparing(false);
    }
  };
  const executeQuery = async (q, data) => {
    const resp = await api.runQuery(q, data);
    if (resp.ok) {
      console.log(resp.data);
    }
  };

  useEffect(() => {
    // load shifts
    async function load() {
      const resp = await api.getAllShifts();
      if (resp.ok) {
        setShifts(resp.data);
      }
    }

    load();
  }, []);

  return (
    <div className="App">
      <Container>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>
                Overlap Minutes: {overlap?.overlap_minutes}
              </Typography>
              <Typography>
                Max Overlap Threshold: {overlap?.max_overlap_threshold}
              </Typography>
              <Typography>
                Exceeds Overlap Threshold:{' '}
                {overlap
                  ? overlap.exceeds_overlap_threshold
                    ? 'True'
                    : 'False'
                  : ''}
              </Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Button
                variant="contained"
                disabled={comparing}
                onClick={compareShifts}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2} marginBottom={4}>
          {shifts.map((s) => (
            <Grid key={s.shift_id} item xs={4}>
              <ShiftCard
                shift={s}
                onClick={() => handleToggle(s)}
                selected={selected.includes(s.shift_id)}
              />
            </Grid>
          ))}
        </Grid>
        <Paper sx={{ padding: 2, textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={() => executeQuery(4)}
          >
            Execute Q4 Query
          </Button>
          <Button
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={() => executeQuery(5)}
          >
            Execute Q5 Query
          </Button>
          <Button
            variant="contained"
            onClick={() => executeQuery(6, { nurse_id: 1001 })}
          >
            Execute Q6 Query
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
