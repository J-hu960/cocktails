import { TDrink } from '@/app/types';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'

const SelectListCompont = ({selected,setSelected}) =>{
  
  const data = [
      {key:'1', value:'Cocktail'},
      {key:'2', value:'Ordinary Drink'},
      {key:'3', value:"Punch / Party Drink"},
      {key:'4', value:'Shake'},
      {key:'5', value:'Cocoa'},
      {key:'6', value:'Shot'},
      {key:'7', value:'Beer'},
      {key:'8', value:"Soft Drink"},
      {key:'9', value:'Coffee / Tea'},
  ]

  return(
    <SelectList 
        setSelected={(val:TDrink) => setSelected(val)} 
        data={data} 
        save="value"
        searchPlaceholder='Filtrar...'
        placeholder='Categorias'
        maxHeight={150}
        notFoundText='No existe'
    />
  )


}

export default SelectListCompont