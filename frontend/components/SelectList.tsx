import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'

const SelectListCompont = () =>{
  const [selected, setSelected] =useState<string>("");
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

  return(
    <SelectList 
        setSelected={(val:string) => setSelected(val)} 
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