const moves = [
    {
        "id": 1,
        "name": "Pound",
        "type": "Normal",
        "category": "Physical",
        "power": 40,
        "accuracy": 100,
        "pp": 35,
        "description": "The target is physically pounded with a long tail, a foreleg, or the like.",
        "effects": []
    },
    {
        "id": 2,
        "name": "Karate Chop",
        "type": "Fighting",
        "category": "Physical",
        "power": 50,
        "accuracy": 100,
        "pp": 25,
        "description": "The target is attacked with a sharp chop. Critical hits land more easily.",
        "effects": []
    },
    {
        "id": 3,
        "name": "Double Slap",
        "type": "Normal",
        "category": "Physical",
        "power": 15,
        "accuracy": 85,
        "pp": 10,
        "description": "The target is slapped repeatedly, back and forth, two to five times in a row.",
        "effects": []
    },
    {
        "id": 4,
        "name": "Comet Punch",
        "type": "Normal",
        "category": "Physical",
        "power": 18,
        "accuracy": 85,
        "pp": 15,
        "description": "The target is hit with a flurry of punches that strike two to five times in a row.",
        "effects": []
    },
    {
        "id": 5,
        "name": "Mega Punch",
        "type": "Normal",
        "category": "Physical",
        "power": 80,
        "accuracy": 85,
        "pp": 20,
        "description": "The target is slugged by a punch thrown with muscle-packed power.",
        "effects": []
    },
    {
        "id": 6,
        "name": "Pay Day",
        "type": "Normal",
        "category": "Physical",
        "power": 40,
        "accuracy": 100,
        "pp": 20,
        "description": "Numerous coins are hurled at the target to inflict damage. Money is earned after the battle.",
        "effects": []
    },
    {
        "id": 7,
        "name": "Fire Punch",
        "type": "Fire",
        "category": "Physical",
        "power": 75,
        "accuracy": 100,
        "pp": 15,
        "description": "The target is punched with a fiery fist. It may also leave the target with a burn.",
        "effects": [
            {
                "type": "status",
                "chance": 10,
                "status": "burn"
            }
        ]
    },
    {
        "id": 8,
        "name": "Ice Punch",
        "type": "Ice",
        "category": "Physical",
        "power": 75,
        "accuracy": 100,
        "pp": 15,
        "description": "The target is punched with an icy fist. It may also leave the target frozen.",
        "effects": [
            {
                "type": "status",
                "chance": 10,
                "status": "freeze"
            }
        ]
    },
    {
        "id": 9,
        "name": "Thunder Punch",
        "type": "Electric",
        "category": "Physical",
        "power": 75,
        "accuracy": 100,
        "pp": 15,
        "description": "The target is punched with an electrified fist. It may also leave the target with paralysis.",
        "effects": [
            {
                "type": "status",
                "chance": 10,
                "status": "paralysis"
            }
        ]
    },
    {
        "id": 10,
        "name": "Scratch",
        "type": "Normal",
        "category": "Physical",
        "power": 40,
        "accuracy": 100,
        "pp": 35,
        "description": "Hard, pointed, and sharp claws rake the target to inflict damage.",
        "effects": []
    },
    {
        "id": 11,
        "name": "Vice Grip",
        "type": "Normal",
        "category": "Physical",
        "power": 55,
        "accuracy": 100,
        "pp": 30,
        "description": "The target is gripped and squeezed from both sides to inflict damage.",
        "effects": []
    },
    {
        "id": 12,
        "name": "Guillotine",
        "type": "Normal",
        "category": "Physical",
        "power": null,
        "accuracy": 30,
        "pp": 5,
        "description": "A vicious, tearing attack with big pincers. The target will faint instantly if this attack hits.",
        "effects": []
    }
]