import { useMemo } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import WindowedSelect from "react-windowed-select"
import { useCities } from "src/utils/api"

interface CitySelectProps<T extends FieldValues> {
    control?: Control<T>,
    name: Path<T>
}

export const CitySelect = <T extends FieldValues>({control, name}:CitySelectProps<T>) =>{
    const {data: cities} = useCities()


    const options = useMemo(() => {
        return cities?.map(city => ({
            label: city.city,
            value: city.idCity
        }))
    }, [cities])

    if(!cities) return null
    return(
        <Controller
            control={control}
            name={name}
            rules={{ required : 'Поле обязательно' }}
            render={({field:{onChange, value, ref}}) => (
                <WindowedSelect 
                    placeholder="Выберете город"
                    styles={{
                        control: (base) => ({
                            ...base,
                            fontSize: "14px",
                            borderRadius: "10px",
                            boxSizing: "border-box",
                            border: "2px solid #FFD700",
                            transition: "all 0.3s",
                            outline: 'none',
                            boxShadow: 'none',
                            color: '#BFBFBF',
                            [':focus']: {
                                borderColor: '#FFB800',
                            },
                            [':hover']: {
                                borderColor: '#FFB800',
                            },
                        }),
                        menu: (base) => ({
                            ...base,
                            zIndex: 2
                        }),
                    }}
                    onChange={onChange}
                    ref={ref}
                    value={cities.find(c => c.city === value)}
                    options={options} 
                    windowThreshold={0}                
                />
            )}
        />
    )
}