---
layout: post
title: Metadaten
category: thesis
---

Metadaten sind mehr als nur ein Bild! Zwar erhebt die aktuelle Applikation Metadaten, aber nutzt sie nicht. Was genau genommen die Applikation überflüssig macht. Denn allein Bilder arrangieren geht auch völlig analog.

Deshalb muss einerseits darüber nachgedacht werden, wie die Metadaten genutzt werden sollen, andererseits auch wie man ihre Erhebung angenehmer gestalten werden kann. Besondere Beachtung verdienen dabei vor allem die beiden Semantischen Differenziale, da sie den Großteil der Datenerhebung ausmachen. 	

{% include twoImagesWithCaption.html param1="SemDiff-GUI-input.png" param2="Das Input Interface des ersten Semantischen Differenzials" param3="SemDiff-GUI-output.png" param4="und die entsprechende Visualisierung" %}

Für die Eingabe diente bisher eine Fülle von Schiebereglern. Aber nicht nur die schiere Anzahl der abgefragten Parameter gestaltet die Eingabe langwierig und wenig abwechslungsreich. Zwei weitere Faktoren ziehen den Prozess in die Länge:

+ Durch die Anordnung der Parameter neben- und untereinander bietet sich dem Nutzer keine Reihenfolge an, in der er die Parameter ab arbeiten kann. Sein Auge und damit auch seine Aufmerksamkeit können hin und her springen, was auch dazu führen kann, dass Parameter ungewollt übersprungen werden.
+ Bei jedem Parameter werden dem Benutzer eigentlich drei Fragen gestellt:
	1. Möchte oder kann er eine Angabe machen (die Checkbox)?
	2. Ist das Objekt eher das eine oder das andere (fragil – stabil)?
	3. Wie sehr ist es das?

Die Ausgabe gibt die Eingabe ohne jegliche Abstraktion wider, was zu folgenden Problemen führt:

+ Aufgrund der schon beklagten Anordnung ist der Benutzer gezwungen, die Auswertung auf ein Neues durch lesen zu erfassen.
+ Durch die fehlende Abstraktion wird dem Benutzer kein einprägsames Bild geliefert, das es ihm ermöglicht im Vergleich mit anderen Objekten etwaige Muster erkennen zu können.

#### Methode

Hat der User ein Objekt neu angelegt, ein Foto damit verknüpft und die ersten Angaben in Textform abgeschlossen, fragt ihn das Objekt selbstständig nach seinem Aussehen und seiner Wirkung.

{% include fourImagesWithCaption.html param1="Screen-01-LandingPage-User.jpg" param2="Das Objekt erfragt immer nur einen Parameter" param3="Screen-03-left.jpg" param4="Die Entscheidung fällt der Benutzer …" param5="Screen-04-right.jpg" param6="… durch schieben des Objektes in die entsprechende Richtung." param7="Screen-18-Info-02.jpg" param8="Ein besser lesbare Auswertung."%}

Was in dem hier dargestellten Smartphone Layout durch schieben des Objektes, also einer Touch Geste, geschieht, findet sein Pendant auf dem Lap- oder Desktop Computer durch Interaktion mit der Mouse (drag and drop oder klicken in die entsprechende Richtung) und alternativ als Tastatursteuerung mit den Pfeiltasten (und w, s, a, d für Linkshänder oder Computerspieler). Der Einsatz von Animationen erhöht den Spass bei der Benutzung der Applikation und somit auch die Bereitschaft sich mit dem Werkzeug auseinander zusetzen.

Das Stellen der Fragen nacheinander verhindert das ungewollte Überspringen weitestgehend. Es entfällt zu dem die Differenzierung des Adjektivs an sich. Es gibt kein „sehr handwerklich“ mehr, sondern nur noch das eine oder das andere (wieso die fehlende Differenzierung dem Ergebnis nicht schadet, werden Sie, werter Leser, in der These „Social Network“ erfahren).

Die neugestaltete Auswertung kann schnell mit einem Blick erfasst werden und ermöglicht somit den Vergleich mit anderen Objekten. Dennoch muss die Anzahl der derzeit erfragten 24 Parameter verringert werden, da sich andernfalls eine leicht zu erfassende Auswertung nicht mehr bewerkstelligen lässt. 

Eine solche Auswertung sollte sich auch in jedem Cluster, aus den Werten der ihm enthaltenen Objekte, generieren, um auch hier ein schnellen Vergleich zu ermöglichen.