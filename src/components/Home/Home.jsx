import Cards from "../Cards/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import style from './Home.module.css';
import { sortAZ, sortAttack, getPoke, filterByTypes, getTypes, cleanState } from "../../redux/actions";
import { orderByOrigin } from "../../redux/actions";

const Home = () => {
    const dispatch = useDispatch();
    const [currentOrder, setCurrentOrder] = useState('ASC');
    const [attackOrder, setAttackOrder] = useState('HI');
    const [originOrder, setOriginOrder] = useState('DB');
    const [selectedType, setSelectedType] = useState("");
    const [clean, setClean] = useState();
    const types = useSelector((state) => state.types);

    useEffect(() => {
        dispatch(getPoke())
        dispatch(getTypes());
    }, [dispatch]);

    const handleAZChange = (event) => {
        const newOrder = event.target.value;
        setCurrentOrder(newOrder);
        dispatch(sortAZ(newOrder));
    };

    const handleAttackChange = (event) => {
        const newOrder = event.target.value;
        setAttackOrder(newOrder);
        dispatch(sortAttack(newOrder));
    };

    const handleOriginChange = (event) => {
        const newOrder = event.target.value;
        setOriginOrder(newOrder);
        dispatch(orderByOrigin(newOrder));
    };

    const handleTypeFilter = (event) => {
        const handlerType = event.target.value;
        setSelectedType(handlerType);
        dispatch(filterByTypes(handlerType));
    };

    const handlerClean = () => {
        dispatch(getPoke());
        setSelectedType("");
        setOriginOrder("");
        setAttackOrder("");
        setCurrentOrder("");
    };

    return(
        <div className={style.home}>
            <div className={style.containSelect}>
                <select className={style.selectTypes} value={selectedType} onChange={handleTypeFilter}>
                    <option value="">All Types</option>
                    {types.map((type) => (
                        <option className={style.option} key={type.id} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.containSelectAll}>
                <select className={style.containSelectLists} value={currentOrder} onChange={handleAZChange}>
                    <option value="ASC">ASC</option>
                    <option value="DSC">DSC</option>
                </select>
                <select className={style.containSelectLists} value={attackOrder} onChange={handleAttackChange}>
                    <option value="HI">By Attack: High to Low</option>
                    <option value="LOW">By Attack: Low to High</option>
                </select>
                <select className={style.containSelectLists} value={originOrder} onChange={handleOriginChange}>
                    <option value="DB">By Origin: Database</option>
                    <option value="API">By Origin: API</option>
                </select>
                <button className={style.button} onClick={handlerClean}>Clean</button>
            </div>
            <Cards/>
        </div>
    )
};
        
export default Home;