export default class InventarioSchema {
    static schema = {
        name: 'Inventarios',
        primaryKey: "InventarioId",
        properties: {
            InventarioId: { type: 'string', indexed: true },
            CodVen: 'int',
            Nome: 'string',
            Remessa: 'int',
            Situacao: 'string',
            DataAbertura: 'date',
            DataSincronizacao: 'date?',
            DataFinalizacao: 'date?',
            Rating: 'int?',
            Comentario: 'string?',
            CodUsuario: 'int',
        }
    }
}