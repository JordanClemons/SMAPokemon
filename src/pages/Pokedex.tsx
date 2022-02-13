import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Pokemon, PokemonInfoCard } from '../components/PokemonInfoCard'
import { Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  LoadMore: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    transition: '.2s',
    '&:hover': {
      opacity: 0.5,
    },
  },
})

interface PokemonName {
  name: string
  url: string
}

export function Pokedex() {
  const classes = useStyles()
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([])
  const [offset, setOffset] = useState(-20)

  async function findPokemon(p: PokemonName) {
    const lowerCase = p.name.toLowerCase()
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${lowerCase}/`
    )
    const data = await response.json()
    return data as Pokemon
  }

  useEffect(() => {
    ;(async function getPoke() {
      const currPokemon = [...pokemon]
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
      )
      const data = await response.json()
      const arr: Pokemon[] = []
      for (const pokeName of data.results) {
        const pokemonRes = await findPokemon(pokeName)
        arr.push(pokemonRes)
      }
      setPokemon(currPokemon.concat(arr))
    })()
  }, [offset])

  useEffect(() => {
    setOffset(0)
  }, [])

  return (
    <Container style={{ paddingBottom: 24, paddingTop: 24 }} maxWidth={'lg'}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{ paddingBottom: 24, paddingTop: 24 }}
        maxWidth={'lg'}
      >
        {pokemon.map((p) => (
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            key={p.name}
            style={{ paddingBottom: 24, paddingTop: 24 }}
            maxWidth={'lg'}
          >
            <PokemonInfoCard pokemon={p} />
            <br />
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={12}>
          <Paper
            elevation={2}
            className={classes.LoadMore}
            onClick={() => setOffset(offset + 20)}
          >
            Load More
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
