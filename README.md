# Mozaïk monitoring widgets

## Monitoring — Versions

> Rend une matrice contenant la disponibilité et les numéros de version de tous les environnements listés en paramètre 

### parameters

key           | required | description
--------------|----------|----------------------------------------------------
`title`       | yes      | *Title of the widget*
`url`         | yes      | *URL de l'hôte Monitoring*
`project`     | yes      | *Nom du projet (dans Monitoring)*
`pillar`      | yes      | *Nom des pillers sous forme de liste*
`environment` | yes      | *Matrice contenant les noms de tous les envirronnements*

### usage

```javascript
{
  type: 'monitoring.versions',
  title : "Environnement",
  url : "http://domain.com/monitoring",
  project : "MYPROJECT",
  pillar : ["DEV", "PREPROD", "PROD"],
  environment : [
      ["FAB", "devfab", "pprfab", "prdfab"],
      ["QUA", "devqua", "pprqua", "prdqua"],
      ["INT", "devint", "pprint", "prdint"]],
  columns: 2.5, rows: 1,
  x: 3.5, y: 1
}
```

## Monitoring — Operationals

> Indique le status des applications passé en paramètre

### parameters

key           | required | description
--------------|----------|----------------------------------------------------
`title`       | yes      | *Title of the widget*
`environments`| yes      | *Tableau contenant le nom est l'adresse de chaque applications*

### usage

```javascript
{
  type: 'monitoring.operationals',
  title : "Operationnel",
  environments : [
    {name : "APPLICATION1", url : "https://app1.com"},
    {name : "APPLICATION2", url : "https://app2.com"}
  ],
  columns: 1, rows: 1,
  x: 5, y: 0
}
```