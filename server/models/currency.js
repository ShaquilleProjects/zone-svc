const mongoose = require('mongoose');
const { Schema } = mongoose;

const currencySchema = new Schema({
    pair: String,
    monthly:{
        support:{
            closest:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            closest_most_recent:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            last:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            }
        },
        resistance:{
            closest:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            closest_most_recent:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            last:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            }
        }
    },
    weekly:{
        support:{
            closest:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            closest_most_recent:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            last:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            }
        },
        resistance:{
            closest:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            closest_most_recent:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            last:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            }
        }
    },
    daily:{
        support:{
            closest:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            closest_most_recent:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            last:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            }
        },
        resistance:{
            closest:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            closest_most_recent:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            last:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            }
        }
    },
    h1:{
        support:{
            closest:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            closest_most_recent:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            last:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            }
        },
        resistance:{
            closest:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            closest_most_recent:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            },
            last:{
                level:{
                    upper: { type: Number, default: 0 },
                    lower: { type: Number, default: 0 },
                    strength_index: { type: Number, default: 0 }
                },
                recent_date:{
                    start: {type: Date, default: Date.now},
                    end: {type: Date, default: Date.now}
                }
            }
        }
    }
});

mongoose.model('currency', currencySchema);