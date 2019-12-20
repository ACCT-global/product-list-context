import React, { createContext, useContext, useReducer, FC } from 'react'

interface State {
  visibleProducts: any[]
}

type ReducerActions =
  | { type: 'ADD_VISIBLE_PRODUCT'; args: { product: any } }
  | { type: 'RESET_VISIBLE_PRODUCTS' }

const ProductListStateContext = createContext({})
const ProductListDispatchContext = createContext({})

function productListReducer(state: State, action: ReducerActions): State {
  switch (action.type) {
    case 'ADD_VISIBLE_PRODUCT': {
      const { product } = action.args
      return {
        ...state,
        visibleProducts: state.visibleProducts.concat(product),
      }
    }
    case 'RESET_VISIBLE_PRODUCTS': {
      return { ...state, visibleProducts: [] }
    }
    default: {
      throw new Error(`Unhandled action type on product-list-context`)
    }
  }
}

const initialState: State = {
  visibleProducts: [] as any[],
}

const ProductListProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(productListReducer, initialState)
  return (
    <ProductListStateContext.Provider value={state}>
      <ProductListDispatchContext.Provider value={dispatch}>
        {children}
      </ProductListDispatchContext.Provider>
    </ProductListStateContext.Provider>
  )
}

const useProductListState = () => {
  const context = useContext(ProductListStateContext)
  if (context === undefined) {
    throw new Error(
      'useProductListState must be used within a ProductListProvider'
    )
  }
  return context
}

const useProductListDispatch = () => {
  const context = useContext(ProductListDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useProductListDispatch must be used within a ProductListProvider'
    )
  }
  return context
}

export default {
  ProductListProvider,
  useProductListState,
  useProductListDispatch,
}
