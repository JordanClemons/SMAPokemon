import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { Pokemon, PokemonInfoCard } from '../components/PokemonInfoCard'
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  SearchBox: {
    paddingLeft: '0px !important',
  },
  container: {
    marginTop: -250,
  },
  title: {
    fontWeight: 600,
    fontSize: 40,
  },
  subTitle: {
    fontWeight: 300,
    fontSize: 20,
  },
})

export function PokemonSearch() {
  const classes = useStyles()

  const [val, setVal] = useState('')
  const [pokemonFound, setPokemonFound] = useState(false)
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon)
  const handleChange = (e: $FixMe) => {
    setVal(e.target.value)
  }

  const submitSearch = () => {
    ;(async () => {
      try {
        const lowerCase = val.toLowerCase()
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${lowerCase}/`
        )
        const data = await response.json()
        setPokemon(data)
        setPokemonFound(true)
      } catch (e) {
        console.error(e)
      }
    })()
  }

  return (
    <Container
      style={{ paddingBottom: 24, paddingTop: 24, textAlign: 'center' }}
      maxWidth={'lg'}
      className={classes.container}
    >
      <Grid
        container
        spacing={{ xs: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h2" className={classes.title}>
            Your go to source for Pokemon.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h3" className={classes.subTitle}>
            Search through 100 different Pokemon and become the very best, like
            no one ever was.
          </Typography>
        </Grid>

        <Grid item xs={8} sm={8} md={8} className={classes.SearchBox}>
          <Paper sx={{ display: 'flex', alignItems: 'center' }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Pokemon"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={handleChange}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  submitSearch()
                }
              }}
            />
            <IconButton
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={() => submitSearch()}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        {pokemonFound ? (
          <Grid item xs={12} sm={12} md={12}>
            <PokemonInfoCard pokemon={pokemon} />
          </Grid>
        ) : null}
      </Grid>
    </Container>
  )
}
