# Inventario de red del aula · UT05

Inventario de los equipos de red del aula de 1.º ASIR en tres ficheros:

- `inventario.xml`: los seis equipos, con `id` y `tipo` como atributos y el resto de datos como elementos.
- `inventario.xsd`: esquema que lo valida, con `xs:pattern` para el id, la IP y la MAC, `xs:date` para la fecha de compra y `xs:unique` para que no se repitan el id, la IP ni la MAC.
- `inventario.json`: los mismos datos en JSON, con el número de puertos como número.

Validación:

```
xmllint --noout --schema inventario.xsd inventario.xml
```

## Comparativa

| Aspecto | XML | JSON |
|---|---|---|
| Tamaño | 2243 bytes | 1969 bytes |
| Validación | XSD con patrones para la IP y la MAC | Necesita JSON Schema aparte |
| Tipos | Todo es texto hasta que se valida con el XSD | Números y textos de forma nativa |
| Lectura desde scripts | Hace falta un analizador XML | `JSON.parse`, `jq` o `json.load` directamente |

## Formato para la herramienta de monitorización

Para exportar el inventario a una herramienta de monitorización como Zabbix, Grafana o Prometheus usaría **JSON**: sus APIs REST trabajan en JSON y se puede leer y filtrar con un script o con `jq` sin convertir nada. El XML con su XSD lo dejaría como copia de referencia del inventario, porque valida las IP y las MAC antes de cargarlas.
