import PropTypes from 'prop-types'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory'

export function RecipeStats({ recipes }) {
  // Transform recipes data for Victory chart
  // Use JS slice and a guard to take the first 3 recipes without mutating the prop
  const topRecipes = Array.isArray(recipes) ? recipes.slice(0, 3) : []
  const chartData = topRecipes.map(recipe => ({
    recipe: recipe.title.length > 15 ? recipe.title.substring(0, 15) + '...' : recipe.title,
    likes: recipe.likes?.length || 0
  }))

  return (
    <div>
      <h2>Top Recipes</h2>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        height={300}
      >
        <VictoryAxis
          tickFormat={(t) => t}
          style={{
            tickLabels: { angle: -45, fontSize: 10, padding: 5 }
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Number of Likes"
          style={{
            axisLabel: { padding: 40 }
          }}
        />
        <VictoryBar
          data={chartData}
          x="recipe"
          y="likes"
          style={{
            data: { fill: "#c43a31" }
          }}
        />
      </VictoryChart>
    </div>
  )
}

RecipeStats.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string)
  })).isRequired
}