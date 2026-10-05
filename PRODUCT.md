# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Bărbați de 18-35 ani din România care joacă fotbal 5x5/7x7 recreativ, regulat, cu un grup fix de prieteni, fără club oficial. Intră cel mai des de pe telefon, imediat după meci, ca să noteze ce s-a întâmplat. (Confirmat de user.)

## Product Purpose

Aplicație web în care jucătorul amator își creează un profil personal și își urmărește parcursul: meciuri jucate, goluri, assist-uri, rating personal, evoluție în timp. Scopul v1 e să testeze o singură ipoteză: userul revine constant să-și logheze meciurile timp de o lună (validare începută 2026-08-19).

## Positioning

Strict despre identitatea și progresul individual al jucătorului amator. Nu e marketplace de jucători sau rezervare de teren (Reservo, Fotbalist, Playerfy) și nu e tool de administrare de club sau academie (MaxClub, PlyrHQ).

## Operating Context

Se folosește scurt, după meci, de pe telefon: adaugi meciul (dată, context liber, goluri, assist-uri, rating opțional), apoi consulți istoricul și dashboard-ul de statistici agregate. Autentificare prin Clerk; datele de joc în PostgreSQL pe Supabase.

## Capabilities and Constraints

- Funcții existente în v1: profil (nume, poziție preferată), adaugă meci, istoric meciuri (editare/ștergere), dashboard cu totaluri și medie goluri/meci, trend de goluri.
- UI-ul și textele vizibile userului sunt în română.
- Mobile-first: telefonul e dispozitivul principal. (Confirmat de user.)
- Din CLAUDE.md (regulă existentă a proiectului, nu o alegere nouă): nu se construiesc funcții din „Amânat pentru v2+” (social, grupuri/echipe, gamificare, upload media, notificări, monetizare) fără confirmare explicită că validarea v1 s-a încheiat sau cerere explicită de a o sări.
- Decizie deschisă: numele produsului. În cod apar „Fotbal Amator” (header, landing) și „Profilul meu de fotbal amator” (titlul paginii); numele nu e final.
- Decizie deschisă: tonul textelor (informal vs. neutru) nu a fost fixat.

## Brand Commitments

Nicio identitate fixată încă: numele e provizoriu, tonul nu e decis, nu există logo sau asset de brand confirmat.

## Evidence on Hand

Site live pe Vercel (`football-tracker-personal.vercel.app`) și un grup de prieteni care testează. Nu există testimoniale, cifre publice sau recenzii care să fie folosite în design; nu se inventează.

## Product Principles

1. Cel mai mic produs care testează ipoteza de retenție; orice nu servește testul se amână.
2. Despre jucătorul individual, nu despre comunitate sau administrare.
3. Logarea unui meci trebuie să fie rapidă pe telefon, imediat după meci.
4. Numerele proprii (goluri, assist-uri, evoluție) sunt recompensa; produsul nu cere nimic în plus de la user.
