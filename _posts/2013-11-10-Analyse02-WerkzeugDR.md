---
layout: post
title: Werkzeug Design Radar
category: analysis
lightbox: [
Desktop-DesignRadar-00.png,
Desktop-DesignRadar-01.png,
Desktop-DesignRadar-Objekt-WP.png,
DR-Textkatalog01.png,
DR-Textkatalog02.png,
DR-Textkatalog03.png,
DR-Differenzial.png,
Desktop-DesignRadar-Cluster-WP.png
]
caption: [
Die „Objects“ Ansicht - alle Objekte des Design Radar,
Die „MyRadar“ Ansicht - das eigene Back End,
Das Objekt komplett abgebildet,
Input Detail - Bei der Texteingabe wird dem Benutzer …,
… ein Begriffskatalog in Form eines Dropdowns zur Verfügung gestellt …,
… das beschleunigt die Eingabe und verhindert unterschiedliche Schreibweisen,
Das Semantische Differenzial zur räumlich physikalischen Wirkung des Objekts,
Der Cluster komplett abgebildet
]
---

Das Werkzeug basiert derzeit auf einer Wordpress Installation, was durchaus ein guter Anfang ist, jedoch auf lange Sicht, mehr Nach-, als Vorteile mit sich bringt. Wordpress eignet sich gut zum Befüllen einer Datenbank mit Designobjekten, die Vorkonfektioniertheit des Wordpress Frameworks schränkt aber die kreative Umsetzung von Werkzeugen, wie dem Design Radar, stark ein. Jegliche Interaktion fühlt sich sehr _bloggig_ an. 

#### Die Eingabe

Was anfangs etwas verwirrt, ist der Umstand, dass der User eigentlich im Front End arbeiten soll. Die Entscheidung ist jedoch nachvollziehbar, da das Wordpress Back End zu viele Optionen anbietet, als dass man damit schnell und einfach Objekte einpflegen könnte, und das Layout eines Wordpress Back Ends ändern möchte man eigentlich auch nicht, wenn es nicht unbedingt sein muss. Deshalb wechselt man zu erst in das Front End, wenn man sich in den Design Radar eingeloggt hat.

Der User landet auf der _Objects_ Ansicht. Es gibt hier die Möglichkeit sich alle Objekte des Design Radars anzuschauen. An der Seite befinden sich Filter Optionen. Unter dem Menüpunkt _Cluster_ kann sich der User alle Cluster des Design Radar anzeigen lassen und unter _MyRadar_ kann er seine eigenen Objekte und Cluster verwalten und neu erstellen.

##### Objekt

Die Eingabemaske verlangt eine Fülle von Parameter, die der Vollständigkeit halber im Glossar unter Objekt aufgelistet sind. Sehr Praktisch ist, dass dem Benutzer für einige Felder (u.a. Farben, Designer, Material) ein Katalog zur Verfügung steht, aus dem er schon Gelistetes auswählen kann. Dies stellt sich einem Auto-Complete-Drop-Down-Menu dar.

Besondere Beachtung verdienen die beiden semantischen Differentiale. Unter den Punkten _Räumlich physikalische Wirkung_ und _Assoziative Wirkung_ finden sich einmal 8 und einmal 16 Extrempaare, zwischen denen, mithilfe eines Schiebereglers auf einer 5er-Skala, differenziert werden kann. Unüblich, aber möglich, ist die Option keine Angaben zu machen. In diesem Fall wird das betreffende Extrempaar ausgegraut. Insgesamt kann der Design Radar User Angaben zu 35 Parametern machen.

##### Cluster

Wenn ein neuer Cluster erstellt wurde, sind erst einmal alle Objekte in ihm enthalten (Big Bug!!!). Das ändert sich erst, wenn andernorts ein Objekt dem Cluster hinzugefügt wurde. Das geht unter der Ansicht _Objects_ und wird unter dem nachfolgenden Punkt beschrieben. Grob kann man den Cluster in drei Bereiche einteilen: die _Objekte_, den generativen Teil _Auffälligkeiten_ und den editorial Teil. Die _Objekte_ werden durch das ihnen eigene Bild repräsentiert, durch einen Klick darauf gelangt man zur Objektanzeige. Der Bereich _Auffälligkeiten_ generiert sich durch die Parameter der hinzugefügten Objekte. Leider werden nur die Parameter _Designer, Materialeigenschaften, Farbpalette und Assoziative Tags_ in Betracht gezogen. Der editorial Teil führt die Punkte auf, die schon von der InDesign Vorlage bekannt sind.

#### Die Verwaltung

Sehr wordpress-typisch mutet die Verwaltung der Objekte an. In einem Raster werden die Objekte durch ihre Fotos repräsentiert. Wenn der User mit der Maus über ein Objekt fährt, erhält er die Möglichkeit durch einen Klick auf den entsprechenden Knopf, das Objekt zu editieren, was soviel heißt, dass er in die vorher beschriebene Eingabemaske zurückkehrt und Parameter verändert oder vervollständigt. Um nach Clustern zu suchen, hat der Benutzer die Möglichkeit, Objekte anhand von 4 Parametern (Herstellungszeitraum, Form, Material, Tags) zu filtern. Die verbleibenden Objekte kann er dann zu einem seiner Cluster hinzufügen.  

#### Die Ausgabe

Es gibt derzeit keine wirklich gestaltete Ausgabe aus dem Werkzeug heraus. Man kann sich alle Objekte und Cluster anschauen, allerdings unterscheidet sich diese Darstellung nicht großartig von der Eingabemaske. Der letzte Stand der Dinge ist, dass die gesammelten Erkenntnisse und Objekte des Clusters in die bereits erwähnte InDesign-Vorlage übertragen und so als Poster ausgedruckt werden.

Anders als bei der analogen Methodik ist man hier sehr allein mit seinen Objekten, Clustern und den dahinter stehenden Überlegungen. Der spielerische Aspekt geht, aufgrund der fehlenden haptischen Repräsentation der Objekte, verloren. Ein Arrangement der Objekte nach eigener Vorstellung ist in der aktuellen Konfiguration nicht möglich. Leider werden auch nicht die Vorzüge des digitalen Mediums genutzt. Beispielsweise finden die semantischen Differentiale keine Erwähnung oder Auswertung im Cluster, was hinsichtlich der Menge der dort abgefragten Parameter sehr schade ist.
