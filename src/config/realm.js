import Realm from "realm";

import ProdutoSchema from "../schemas/ProdutoSchema";

export default function getRealm() {
    return Realm.open({
        schema: [ProdutoSchema]
    });
}