export class Health {

    private router:any;

    public init = (express: any) => {
        this.router = express.Router();
        
        this.router.get('/', async (_req, res, _next) => {
            const healthcheck = {
                uptime: process.uptime(),
                message: 'OK',
                timestamp: Date.now()
            };
            try {
                res.status(200).send();
            } catch (e) {
                healthcheck.message = e;
                res.status(503).send();
            }
        });
    }

    public getRoutes(){
        return this.router;
    }
}
