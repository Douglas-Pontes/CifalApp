import Realm from "realm";

import ProdutoSchema from "../schemas/ProdutoSchema";
import InventarioSchema from "../schemas/InventarioSchema";
import RemessaSchema from "../schemas/RemessaSchema";
import ItemSchema from "../schemas/ItemSchema";


export default function getRealm() {
    return Realm.open({
        schema: [ProdutoSchema, InventarioSchema, RemessaSchema, ItemSchema]
    });
}