# Construct input of case for esbib parser

Assume the tree layout of `input_dir`:

```
...
├── tutorial
│   ├── mylibrary.bib
│   └── mylibrary.bib.bak
├── unconventional-computing
│   ├── adamatzky2002-Experimental-logical-gates-in-a-reaction-diffusion-medium-The-XOR-gate-and-beyond.pdf
│   ├── kuhnert1989-Image-processing-using-light-sensitive-chemical-waves.pdf
│   ├── mylibrary.bib
│   ├── mylibrary.bib.bak
│   └── toffoli1980-Reversible-computing.pdf
└── wireless
    ├── camp2002-A-survey-of-mobility-models-for-ad-hoc-network-research.pdf
    ├── couto2005-A-high-throughput-path-metric-for-multi-hop-wireless-routing.pdf
    ├── hupili-2010-byte-level-crc-implementation.ppt
    ├── liew2008-Proportional-fairness-in-multi-channel-multi-rate-wireless-networks-Part-I-The-case-of-deterministic-channels-with-application.pdf
    ├── lte2009-5-specification.pdf
    ├── mylibrary.bib
    ├── mylibrary.bib.bak
    └── pal2012-On-Social-Community-Networks-The-Cost-Sharing-Problem.pdf
```

We want to package the bib files into a tree structure:

```
├── tutorial
│   ├── mylibrary.bib
├── unconventional-computing
│   ├── mylibrary.bib
└── wireless
    ├── mylibrary.bib
```

## Usage

   * configure `input_dir`  and `output_dir` in `conf.sh`.
   * Use `./list-bib.sh` to get the whole list of `*.bib` under `input_dir`.
   * Edit `list` to remove unwanted `.bib` files.
   * Use `./cp-bib.sh` to put selected bibs into `output_dir` with same tree structure.
