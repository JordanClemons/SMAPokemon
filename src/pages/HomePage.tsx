import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import BookIcon from '@mui/icons-material/Book'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  homeButton: {
    backgroundColor: 'rgba(195,195,195,.5)',
    display: 'block',
    width: '100px',
    height: '100px',
    margin: 30,
    borderRadius: 20,
    '&:hover': {
      backgroundColor: 'rgba(195,195,195,.3)',
    },

    animation: `$floating 2000ms ease-in-out`,
    animationIterationCount: 'infinite',
  },

  container: {
    animation: `$fadeIn 1000ms ease-in-out`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: -200,
  },

  title: {
    paddingBottom: 20,
  },

  '@keyframes floating': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(15px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },

  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
})

export function HomePage() {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Container maxWidth={'lg'} className={classes.container}>
      <Typography variant="h2" component="h1" className={classes.title}>
        Poke App
      </Typography>
      <Grid
        container
        spacing={{ xs: 0 }}
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid
          container
          xs={6}
          sm={3}
          md={3}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <IconButton
            className={classes.homeButton}
            onClick={() => history.push('/search')}
          >
            <SearchIcon fontSize="large" />
          </IconButton>
          <Typography component="h2" variant="h6">
            Search Pokemon
          </Typography>
        </Grid>
        <Grid
          container
          xs={6}
          sm={3}
          md={3}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <IconButton
            className={classes.homeButton}
            onClick={() => history.push('/pokedex')}
          >
            <BookIcon fontSize="large" />
          </IconButton>
          <Typography component="h2" variant="h6">
            Pokedex
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
