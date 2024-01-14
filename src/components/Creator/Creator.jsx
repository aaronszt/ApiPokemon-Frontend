import { useEffect, useState } from "react";
import { getTypes, createPoke } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import style from './Creator.module.css';

const Creator = () => {
    
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const poke = useSelector((state) => state.pokemons);
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
      dispatch(getTypes())
  }, [dispatch])
    
    const [input, setInput] = useState({
        name: '', 
        hp: '', 
        attack: '', 
        defense: '', 
        speed: '',
        height: '', 
        weight: '', 
        types: [],
        image: ''
    })
    
    let noEmpty = /\S+/;
    let validateName = /^[A-Za-zñÑ]+$/i;
    let validateNum = /^\d+$/;
    const isValidImage = /^(https?:\/\/)?\S+\.(jpg|jpeg|png)$/;
    
    const validate = (input) => {
        const validateNameDuplicated = poke.some(pokemon => pokemon.name.includes(input.name));

            let errors = {};
            if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3) {
                errors.name = "Name required. Only string of more than two characters and without numbers";
            }
            if(validateNameDuplicated){
                errors.name = "The name already exists";
            }
            if (!validateNum.test(input.hp) || parseInt(input.hp) < 1  || parseInt(input.hp) > 200) {
                errors.hp = "Number required. Higher than one and less than two hundred";
            }
            if (!validateNum.test(input.attack) || parseInt(input.attack) < 1 || parseInt(input.attack) > 200) {
                errors.attack = "Number required. Higher than one and less than two hundred";
            }
            if (!validateNum.test(input.defense) || parseInt(input.defense) < 1 || parseInt(input.defense) > 200) {
                errors.defense = "Number required. Higher than one and less than two hundred";
            }
            if (!validateNum.test(input.speed) || parseInt(input.speed) < 1 || parseInt(input.speed) > 200) {
                errors.speed = "Number required. Higher than one and less than two hundred";
            }
            if (!validateNum.test(input.height) || parseInt(input.height) < 1 || parseInt(input.height) > 200) {
                errors.height = "Number required. Higher than one and less than two hundred";
            }
            if (!validateNum.test(input.weight) || parseInt(input.weight) < 1 || parseInt(input.weight) > 1000) {
                errors.weight = "Number required. Higher than one and less than thousand";
            }
            if (!isValidImage.test(input.image)) {
                errors.image = "URL required";
            }

            return errors;
        };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = (e) => {
        if (input.types.length < 2) {
          if (!input.types.includes(e.target.value)) {
            setInput({
              ...input,
              types: [...input.types, e.target.value]
            });
            e.target.value = 'Select type';
          } else {
            alert('Type already selected');
          }
        } else {
          alert('Two types of pokemon at most');
        }
      };
      

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !errors.name &&
            !errors.hp &&
            !errors.attack &&
            !errors.defense &&
            !errors.speed &&
            !errors.height &&
            !errors.weight &&
            !errors.image 
        ) {

            dispatch(createPoke(input));
            setInput({
                name: '', 
                hp: '', 
                attack: '', 
                defense: '', 
                speed: '',
                height: '', 
                weight: '', 
                types: [],
                image: ''
            });
        } else {
            alert('Error. Check the form');
        }
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            types: input.types.filter(type => type !== e)
        })
    }



    return ( 
        <div >
            <form className={style.formContainer} onSubmit={e => {handleSubmit(e)}}>
                <div className={style.form}>
                    <div >
                        <label>Name:</label>
                        <input type="text" value={input.name} name='name' onChange={e => {handleChange(e)}} placeholder="Name" />
                        <p className={errors.name && style.form}>{errors.name}</p>
                        <label>HP:</label>
                        <input type="number" value={input.hp} name='hp' onChange={e => {handleChange(e)}} placeholder="HP" />
                        <p className={errors.hp && style.form}>{errors.hp}</p>
                        <label>Attack:</label>
                        <input type="number" value={input.attack} name='attack' onChange={e => {handleChange(e)}} placeholder="Attack" />
                        <p className={errors.attack && style.form}>{errors.attack}</p>
                        <label>Defense:</label>
                        <input type="number" value={input.defense} name='defense' onChange={e => {handleChange(e)}} placeholder="Defense" />
                        <p className={errors.defense && style.form}>{errors.defense}</p>
                        <label>Speed:</label>
                        <input type="number" value={input.speed} name='speed' onChange={e => {handleChange(e)}} placeholder="Speed" />
                        <p className={errors.speed && style.form}>{errors.speed}</p>
                        <label>Height:</label>
                        <input type="number" value={input.height} name='height' onChange={e => {handleChange(e)}} placeholder="Height" />
                        <p className={errors.height && style.form}>{errors.height}</p>
                        <label>Weight:</label>
                        <input type="number" value={input.weight} name='weight' onChange={e => {handleChange(e)}} placeholder="Weight" />
                        <p className={errors.weight && style.form}>{errors.weight}</p>
                        <label>Image:</label>
                        <input type="text" value={input.image} name='image' onChange={e => {handleChange(e)}} placeholder="URL Image..." />
                        <p className={errors.image && style.form}>{errors.image}</p>
                    </div>
                    <select onChange={e => {handleSelect(e)}}>
                        <option>Select type</option>
                        {
                            types?.map(e => {              
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                            {
                                input.types.map(e => {
                                    return (
                                        <div className={style.divTypeClose}  key={e}>
                                            <p className={style.pClose} >{e}</p>
                                            <button  onClick={() => {handleDelete(e)}} >x</button>
                                        </div>
                                    )
                                })
                            }
                </div>
            <button className={style.buttonCreate} type='submit'>CREATE!</button>
            </form>
        </div>
     );
}
 
export default Creator;