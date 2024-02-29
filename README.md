# Тестовое задание для Valantis

## Как запускать
1. клонируете
2. устанавливаете зависимости
```
pnmp i
```
3. запускаете
```
pnpm dev
```

## Задание
Используя предоставленный апи создать страницу, которая отражает список товаров. Для каждого товара должен отображаться его id, название, цена и бренд.
* выводить по 50 товаров на страницу с возможностью постраничного перехода
* возможность фильтровать выдачу используя предоставленное апи по названию, цене
  
Если API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются.

Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он

Выполненное задание разместите на github pages или аналогичном сервисе.
