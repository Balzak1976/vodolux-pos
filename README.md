<div align="center"><h1>Vodolux-POS</h1> </div>

Просмотр :point_right:  [Vodolux-pos](https://balzak1976.github.io/vodolux-pos/)

**`!Приложение находится в разработке`**
<br>

Vodolux-POS - это приложение, для автоматизации рабочего места кассира.

### Проблемы, которые должно решить приложение
Основная причина недостачи и пересортицы на складе - ошибки продавца во время продажи.
Сведение к минимуму таких ошибок предназначен Vodolux-pos.
  
### Будущая функциональность
- отображение фотографии постоянных клиентов
- перетаскивание позиции в текущем чеке
- печать ценников на принтере чеков
- контроль единиц товара в набранном чеке
- улучшенный поиск товара
- редактирование штрихкода товара из текущего чека
- контроль и изменение остатков на складе

Начальный макет:

![prototype](./screenshots/prototype.png)


## Стэк технологий

| <a href="https://html.spec.whatwg.org/multipage/" target="_blank" rel="noreferrer"><img width="45" height="45" alt="HTML5" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" /></a> | <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"><img width="45" height="45" alt="CSS3" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" /></a> | <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img width="45" height="45" alt="TypeScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" /></a> | <a href="https://react.dev/" target="_blank" rel="noreferrer"><img width="45" height="45" alt="React" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" /></a> | <a href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer"><img width="45" height="45" alt="Mantine" src="./screenshots/mantine-icon.svg" /></a>|
| :---: | :---: | :---: | :---: | :---: | 
| HTML | CSS  | TypeScript | React | Mantine UI kit |

<br>

## Запуск проекта

клонировать репозиторий 

```javascript
git clone https://github.com/Balzak1976/vodolux-pos.git
```

установить зависимости

```javascript
npm ci 
```
запуск проекта в режиме разработки ( адрес: `http://localhost:3000` )

```javascript
npm run start 
```
создать финальную сборку ( папка `build` )

```javascript
npm run build 
```