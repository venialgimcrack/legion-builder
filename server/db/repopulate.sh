#!/bin/bash

if [ $# -ne 1 ] ; then
    echo "usage: `basename $0` <host>[:<port>]"
    exit
fi

host = $1

mongoimport --host=${host} -d legionbuilder -c products --jsonArray --file ./products/core.json --drop
mongoimport --host=${host} -d legionbuilder -c products --jsonArray --file ./products/expansions-empire.json
mongoimport --host=${host} -d legionbuilder -c products --jsonArray --file ./products/expansions-rebel.json

mongoimport --host=${host} -d legionbuilder -c units --jsonArray --file ./units/rebel.json --drop

mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/armament.json --drop
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/command.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/comms.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/force.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/gear.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/generator.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/grenades.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/hardpoint.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/heavy.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/personnel.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/pilot.json
mongoimport --host=${host} -d legionbuilder -c upgrades --jsonArray --file ./upgrades/training.json